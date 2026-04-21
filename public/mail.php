<?php

declare(strict_types=1);

use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;

$projectRoot = dirname(__DIR__);
$autoloadPath = $projectRoot . '/vendor/autoload.php';

if (!is_file($autoloadPath)) {
    http_response_code(500);
    echo 'Dependencias do PHP nao encontradas. Execute composer install antes de publicar.';
    exit;
}

require $autoloadPath;

/**
 * @return array<string, string>
 */
function loadEnvFile(string $filePath): array
{
    if (!is_file($filePath)) {
        return [];
    }

    $values = [];
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    if ($lines === false) {
        return [];
    }

    foreach ($lines as $line) {
        $trimmed = trim($line);

        if ($trimmed === '' || str_starts_with($trimmed, '#') || !str_contains($trimmed, '=')) {
            continue;
        }

        [$key, $value] = explode('=', $trimmed, 2);
        $key = trim($key);
        $value = trim($value);

        if ($key === '') {
            continue;
        }

        if (
            (str_starts_with($value, '"') && str_ends_with($value, '"')) ||
            (str_starts_with($value, "'") && str_ends_with($value, "'"))
        ) {
            $value = substr($value, 1, -1);
        }

        $values[$key] = $value;
    }

    return $values;
}

function envValue(string $key, array $env): string
{
    $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);

    if (is_string($value) && $value !== '') {
        return trim($value);
    }

    return trim($env[$key] ?? '');
}

function redirectTo(string $location): never
{
    header('Location: ' . $location, true, 303);
    exit;
}

function renderErrorPage(string $message): never
{
    http_response_code(500);
    ?>
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erro ao enviar mensagem</title>
    <style>
      body {
        font-family: Inter, Arial, sans-serif;
        margin: 0;
        background: #f9fafb;
        color: #111827;
      }
      main {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
      }
      .card {
        max-width: 640px;
        width: 100%;
        background: #ffffff;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      }
      a {
        color: #6d28d9;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <main>
      <div class="card">
        <h1>Não foi possível enviar sua mensagem.</h1>
        <p><?= htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></p>
        <p><a href="/#contato">Voltar para o formulário</a></p>
      </div>
    </main>
  </body>
</html>
    <?php
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo 'Metodo nao permitido.';
    exit;
}

$env = loadEnvFile($projectRoot . '/.env');

$smtpHost = envValue('SMTP_HOST', $env);
$smtpPort = envValue('SMTP_PORT', $env);
$smtpUser = envValue('SMTP_USER', $env);
$smtpPassword = envValue('SMTP_PASSWORD', $env);
$recipientEmail = envValue('EMAIL', $env);
$siteUrl = envValue('URL', $env);

$name = trim((string) ($_POST['name'] ?? ''));
$senderEmail = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$honeypot = trim((string) ($_POST['company'] ?? ''));
$redirect = trim((string) ($_POST['redirect'] ?? $siteUrl));

if ($honeypot !== '') {
    redirectTo($siteUrl !== '' ? $siteUrl : '/');
}

if (
    $smtpHost === '' ||
    $smtpPort === '' ||
    $smtpUser === '' ||
    $smtpPassword === '' ||
    $recipientEmail === ''
) {
    renderErrorPage('A configuracao de envio do formulario esta incompleta no servidor.');
}

if ($name === '' || $senderEmail === '' || $message === '') {
    renderErrorPage('Preencha nome, e-mail e mensagem para continuar.');
}

if (!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
    renderErrorPage('Informe um e-mail valido para receber retorno.');
}

$safeRedirect = '/';

if ($siteUrl !== '') {
    $safeRedirect = $siteUrl;
}

if ($redirect !== '') {
    if (str_starts_with($redirect, '/')) {
        $safeRedirect = $redirect;
    } elseif ($siteUrl !== '') {
        $normalizedSiteUrl = rtrim($siteUrl, '/');
        $normalizedRedirect = rtrim($redirect, '/');

        if ($normalizedRedirect === $normalizedSiteUrl || str_starts_with($normalizedRedirect, $normalizedSiteUrl . '/')) {
            $safeRedirect = $redirect;
        }
    }
}
$smtpScheme = $smtpPort === '465' ? 'smtps' : 'smtp';
$transportDsn = sprintf(
    '%s://%s:%s@%s:%s',
    $smtpScheme,
    rawurlencode($smtpUser),
    rawurlencode($smtpPassword),
    $smtpHost,
    rawurlencode($smtpPort)
);

$htmlMessage = sprintf(
    '<h1>Novo contato do site</h1>
    <p><strong>Nome:</strong> %s</p>
    <p><strong>E-mail:</strong> %s</p>
    <p><strong>Telefone/WhatsApp:</strong> %s</p>
    <p><strong>Mensagem:</strong></p>
    <p>%s</p>',
    htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
    htmlspecialchars($senderEmail, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
    htmlspecialchars($phone !== '' ? $phone : 'Nao informado', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
    nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'))
);

$textMessage = implode(PHP_EOL . PHP_EOL, [
    'Novo contato do site',
    'Nome: ' . $name,
    'E-mail: ' . $senderEmail,
    'Telefone/WhatsApp: ' . ($phone !== '' ? $phone : 'Nao informado'),
    'Mensagem:',
    $message,
]);

$email = (new Email())
    ->from($smtpUser)
    ->to($recipientEmail)
    ->replyTo($senderEmail)
    ->subject('Novo contato do site - Rebeca Ayupe')
    ->text($textMessage)
    ->html($htmlMessage);

try {
    $transport = Transport::fromDsn($transportDsn);
    $mailer = new Mailer($transport);
    $mailer->send($email);
    redirectTo($safeRedirect);
} catch (TransportExceptionInterface $exception) {
    renderErrorPage('O servidor de e-mail recusou o envio. Tente novamente em alguns instantes.');
} catch (Throwable $exception) {
    renderErrorPage('Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.');
}
