import type { CustomSession } from "@/interfaces";
import ButtonCreateCommunity from "./ButtonCreateCommunity";
import DialogCreateCommunity from "./DialogCreateCommunity";
import Form from "./Form";
import ConnectToDiscord from "./ConnectToDiscord";
import ImportedForm from "./ImportedForm";

export interface DialogWrapperProps {
  session: CustomSession | null;
}

export default function DialogWrapper({ session }: DialogWrapperProps) {
  /**
   * info
   * this approach is for triggering ssr as much as possible
   */
  return (
    <DialogCreateCommunity
      manualTab={<Form />}
      btnTrigger={<ButtonCreateCommunity />}
      discordTab={
        session?.user?.discordData ? <ImportedForm /> : <ConnectToDiscord />
      }
    />
  );
}
