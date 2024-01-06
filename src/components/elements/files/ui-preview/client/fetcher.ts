import { SANDBOX_URL } from "@/lib/constant";
import { PREVIEW_TIMEOUT } from "@/scripts/ui-preview/constant";
import { TimeOutError } from "@/scripts/ui-preview/errors";

type ReceiveData = {
  height: number;
  error: boolean;
};

function createTimeoutHandler(
  reject: (reason?: unknown) => void,
  ms: number = PREVIEW_TIMEOUT
): {
  startTimer: (listener: (e: MessageEvent) => void) => void;
  timer: NodeJS.Timeout | undefined;
} {
  let timer: NodeJS.Timeout | undefined;

  function startTimer(listener: (e: MessageEvent) => void) {
    timer = setTimeout(() => {
      reject(new TimeOutError());
      window.removeEventListener("message", listener);
    }, ms);
  }

  return { startTimer, timer };
}

export async function getPostMessage() {
  return new Promise<ReceiveData>((resolve, reject) => {
    const { startTimer, timer } = createTimeoutHandler(reject);
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SANDBOX_URL) return;

      const data = JSON.parse(e.data) as ReceiveData;

      if (data.error) {
        reject(new TimeOutError());
      } else {
        resolve(data);
      }

      if (timer) clearTimeout(timer);
      window.removeEventListener("message", onMessage);
    };

    startTimer(onMessage);
    window.addEventListener("message", onMessage);
  });
}

export async function onReloadIframe(ref: HTMLIFrameElement | null) {
  if (!ref) throw new Error("ref is null");

  const { contentWindow } = ref;

  if (!contentWindow) throw new Error("contentWindow is null");

  const message = JSON.stringify({ action: "reload" });

  contentWindow.postMessage(message, SANDBOX_URL);

  return new Promise<void>((resolve, reject) => {
    const { timer, startTimer } = createTimeoutHandler(reject);
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SANDBOX_URL) return;

      const data = JSON.parse(e.data) as { error: boolean };

      if (data.error) {
        reject(new Error("Error"));
      } else {
        resolve();
      }

      if (timer) clearTimeout(timer);
      window.removeEventListener("message", onMessage);
    };

    startTimer(onMessage);
    window.addEventListener("message", onMessage);
  });
}
