export const translateNotificationType = (
  type: "general" | "mail" | "critical"
): string => {
  const translations: Record<typeof type, string> = {
    general: "General",
    mail: "Mail",
    critical: "Critical",
  };

  return translations[type];
};
