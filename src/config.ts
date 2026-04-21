const rawWhatsapp = import.meta.env.WHATSAPP || '+5562986510128';
const whatsappDigits = rawWhatsapp.replace(/\D/g, '');

function formatWhatsappForDisplay(phoneDigits: string) {
  const hasBrazilCode = phoneDigits.startsWith('55');
  const localDigits = hasBrazilCode ? phoneDigits.slice(2) : phoneDigits;

  if (localDigits.length === 11) {
    const ddd = localDigits.slice(0, 2);
    const prefix = localDigits.slice(2, 7);
    const suffix = localDigits.slice(7);
    return hasBrazilCode
      ? `+55 (${ddd}) ${prefix}-${suffix}`
      : `(${ddd}) ${prefix}-${suffix}`;
  }

  if (localDigits.length === 10) {
    const ddd = localDigits.slice(0, 2);
    const prefix = localDigits.slice(2, 6);
    const suffix = localDigits.slice(6);
    return hasBrazilCode
      ? `+55 (${ddd}) ${prefix}-${suffix}`
      : `(${ddd}) ${prefix}-${suffix}`;
  }

  return rawWhatsapp;
}

// Configurações do site carregadas do .env
export const CONFIG = {
  // Contato
  whatsapp: rawWhatsapp,
  whatsappFormatado: whatsappDigits,
  whatsappVisual: formatWhatsappForDisplay(whatsappDigits),
  whatsappHref: `tel:+${whatsappDigits}`,
  email: import.meta.env.EMAIL || 'psirebecaayupe@gmail.com',
  instagram: import.meta.env.INSTAGRAM || 'psirebeca_ayupe',

  // Google Tag Manager
  googleTagManager: import.meta.env.GOOGLE_TAG_MANAGER?.trim() || '',
  
  // URLs e links externos
  siteUrl: import.meta.env.URL || 'https://psirebecaayupe.com.br',
  instagramUrl: `https://instagram.com/${import.meta.env.INSTAGRAM || 'psirebeca_ayupe'}`,
  
  // Informações profissionais
  nome: 'Rebeca Ayupe Ferreira',
  titulo: 'Psicóloga | CRP 09/20699',
  
  // Horário de funcionamento
  horarioAtendimento: 'Segunda a Sexta, 08:00 - 18:00',
  
  // Mensagens pré-formatadas para WhatsApp
  mensagens: {
    geral: 'Olá%20Dra.%20Rebeca%2C%20gostaria%20de%20agendar%20uma%20sessão%20de%20psicoterapia.%20Poderia%20me%20informar%20sobre%20horários%20disponíveis%3F',
    ansiedade: 'Olá%20Dra.%20Rebeca%2C%20gostaria%20de%20agendar%20uma%20sessão%20para%20tratar%20da%20ansiedade.%20Poderia%20me%20informar%20sobre%20horários%20disponíveis%3F',
    depressao: 'Olá%20Dra.%20Rebeca%2C%20gostaria%20de%20agendar%20uma%20sessão%20para%20tratar%20da%20depressão.%20Poderia%20me%20informar%20sobre%20horários%20disponíveis%3F',
    psicanalise: 'Olá%20Dra.%20Rebeca%2C%20gostaria%20de%20agendar%20uma%20sessão%20de%20psicoterapia%20com%20abordagem%20psicanalítica.%20Poderia%20me%20informar%20sobre%20horários%20disponíveis%3F',
  },
  
  // Meta tags
  descricaoSite: 'Psicoterapia online para adultos e adolescentes com a Dra. Rebeca Ayupe (CRP 09/20699). Abordagem Psicanalítica para ansiedade, depressão e desenvolvimento pessoal.',

  // Localização (E-E-A-T / LocalBusiness)
  cidade: 'Goiânia',
  estado: 'GO',
  pais: 'BR',
  crp: '09/20699',
};
