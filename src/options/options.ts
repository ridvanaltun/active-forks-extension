import { ConfigProvider } from "../config";

const activeForksUrlInput = document.getElementById(
  "active-forks-url-input"
)! as HTMLInputElement;
const activeForksPopupInput = document.getElementById(
  "active-forks-open-as-popup"
)! as HTMLInputElement;
const messageElement = document.getElementById("message")! as HTMLDivElement;

const init = async () => {
  const configProvider = await ConfigProvider.create();

  // Initialize UI
  const initialConfig = configProvider.getConfig();
  activeForksUrlInput.value = initialConfig.activeForksUrl;
  activeForksPopupInput.checked = initialConfig.openAsPopup;

  let timeout: number | undefined = undefined;

  // Save config before close
  const save = () => {
    // Update config (propagated internally)
    configProvider.setConfig({
      activeForksUrl: activeForksUrlInput.value || undefined,
      openAsPopup: activeForksPopupInput.checked,
    });
    if (timeout) {
      window.clearTimeout(timeout);
      timeout = undefined;
    }
    messageElement.innerText = "Saved.";
    timeout = window.setTimeout(() => {
      messageElement.innerText = "";
      timeout = undefined;
    }, 3000);
  };
  activeForksUrlInput.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    save();
  });
  activeForksPopupInput.addEventListener("change", save);
};

init().catch((err) => console.error(err));
