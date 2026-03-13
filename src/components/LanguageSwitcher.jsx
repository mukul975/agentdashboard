import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n/config";

const LanguageSwitcher = () => {
  const { i18n,t } = useTranslation();
  const current = i18n.resolvedLanguage;
  return (
    <>
      <div>
        <select
          value={current}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          aria-label={t('language_switcher.select_label')}
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            color: "var(--text-secondary)",
            fontSize: "13px",
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          {SUPPORTED_LANGUAGES.map(({ code, label, flag }) => (
            <option key={code} value={code}>
              {flag} {label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default LanguageSwitcher;
