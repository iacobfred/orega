import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import Typography from "@mui/material/Typography";
import PageHeader from "@components/PageHeader";
import Box from "@mui/material/Box";
import { getMessages } from "@utils/i18n";
import React from "react";
import { DownloaderHelper } from "node-downloader-helper";
import { renameSync } from "fs";
import { useTranslation } from "next-i18next";

const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/jacobfredericksen/";

const GOOGLE_DOC_URL =
  "https://docs.google.com/document/d/12FrIt6hJwACrZfv6-2VygGGjTWDQhcbKGw5oPZJdXks/edit?usp=sharing";
const GOOGLE_DOC_PDF_DL_URL = GOOGLE_DOC_URL.replace("edit?usp=sharing", "export?format=pdf");
const RESUME_DIR = `${process.cwd()}/public`;
const RESUME_FILENAME_WITHOUT_EXTENSION = "resume";
const RESUME_FILE_EXTENSION = "pdf";
const RESUME_FILENAME = `${RESUME_FILENAME_WITHOUT_EXTENSION}.${RESUME_FILE_EXTENSION}`;
const RESUME_FILEPATH = `${RESUME_DIR}/${RESUME_FILENAME}`;
const RESUME_URL = "/resume.pdf#toolbar=0&navpanes=0&scrollbar=0";

export default function CV() {
  const { t } = useTranslation("cv");
  return (
    <Layout>
      <PageHeader>{t("title")}</PageHeader>
      <Box textAlign={"center"} my={2}>
        <Typography>{t("linkedInProfileIntro")}</Typography>
        <Typography>
          <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noreferrer">
            {LINKEDIN_PROFILE_URL}
          </a>
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "210mm", // A4
          minHeight: "297mm", // A4
          mx: "auto",
        }}
      >
        <embed
          src={RESUME_URL}
          style={{ width: "100%" }}
          height="1079" // pixels
          type="application/pdf"
        />
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messagesPromise = getMessages(locale, ["cv"]);
  const id = Date.now(); // e.g., 1664775602649
  const tempFilename = `${RESUME_FILENAME_WITHOUT_EXTENSION}-${id}.pdf`;
  const dl = new DownloaderHelper(GOOGLE_DOC_PDF_DL_URL, RESUME_DIR, {
    fileName: tempFilename,
  });
  dl.on("end", () => console.log("Download completed."));
  dl.on("error", (err: unknown) => console.log("Download Failed", err));
  await dl.start().catch((err: unknown) => console.error(err));
  const tempFilepath = `${RESUME_DIR}/${tempFilename}`;
  renameSync(tempFilepath, RESUME_FILEPATH);
  return {
    props: { ...(await messagesPromise) },
  };
};
