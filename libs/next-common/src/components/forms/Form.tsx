import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormAction, FormStatus } from "@utils/forms";
import { Dispatch, ReactNode, SyntheticEvent, useState } from "react";

type FormDataBase = { [key: string]: string };

interface FormProps<FormData extends FormDataBase> {
  dispatch?: Dispatch<FormAction<FormData>>;
  status: FormStatus;
  setStatus: (status: FormStatus) => void;
  onSubmit: (event: SyntheticEvent) => Promise<{ ok?: boolean; error?: string }>;
  translationsKey?: string;
  children: ReactNode;
}

export default function Form<FormData extends FormDataBase>({ children, onSubmit }: FormProps<FormData>) {
  //   const { t } = useTranslation(translationsKey);
  const [status, setStatus] = useState<FormStatus>("idle");
  const handleSubmit = async (event: SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    setStatus("submitting");
    const result = await onSubmit(event);
    if (result.ok) {
      setStatus("submitted");
    } else if (result.error) {
      console.error(result.error);
      setStatus("error");
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", position: "relative" }}>
      {children}
      <Box textAlign="center">
        <Button type="submit" variant={"outlined"} size={"large"} sx={{ my: 2, mx: "auto" }}>
          {status === "submitting" ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </form>
  );
}
