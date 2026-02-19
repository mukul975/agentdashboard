const avatarColors = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#14b8a6",
];

export function getInitials(name) {
  if (!name) return "";

  const words = name.split(/[\s-]+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return words
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("");
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function getAvatarColor(name) {
  const hash = hashCode(name);
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
}
