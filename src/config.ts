// Configurações do site carregadas do .env
export const CONFIG = {
  // Contato
  whatsapp: import.meta.env.WHATSAPP || '+5562986510128',
  whatsappFormatado: import.meta.env.WHATSAPP?.replace(/^\+/, '') || '5562986510128',
  email: import.meta.env.EMAIL || 'psirebecaayupe@gmail.com',
  instagram: import.meta.env.INSTAGRAM || 'psirebeca_ayupe',
  
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
    tcc: 'Olá%20Dra.%20Rebeca%2C%20gostaria%20de%20agendar%20uma%20sessão%20para%20terapia%20cognitivo-comportamental.%20Poderia%20me%20informar%20sobre%20horários%20disponíveis%3F',
  },
  
  // Meta tags
  descricaoSite: 'Psicoterapia online para adultos e adolescentes com a Dra. Rebeca Ayupe (CRP 09/20699). Especialista em Terapia Cognitivo-Comportamental.',
}; 