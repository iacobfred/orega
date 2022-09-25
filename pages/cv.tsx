import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import { GetStaticProps } from "next";
import { Typography } from "@mui/material";

const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/jacobfredericksen/";

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <Typography>{"I'll add a copy of my resume here soon."}</Typography>
        <Typography>{"In the meantime, take a look at my LinkedIn profile:"}</Typography>
        <Typography>
          <Link href={LINKEDIN_PROFILE_URL}>
            <a>{LINKEDIN_PROFILE_URL}</a>
          </Link>
        </Typography>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
