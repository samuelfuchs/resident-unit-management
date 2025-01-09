export const translateNotificationType = (
  type: "general" | "mail" | "critical"
): string => {
  const translations: Record<typeof type, string> = {
    general: "Geral",
    mail: "Correio",
    critical: "Crítico",
  };

  return translations[type];
};
