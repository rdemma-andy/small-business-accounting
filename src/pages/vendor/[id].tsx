import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { VendorView } from "~/components/vendorCard";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import { RouterOutputs, api } from "~/utils/api";

const SingleVendorPage: NextPage<{id: string}> = ({ id }) => {
  const {data} = api.vendors.getById.useQuery({
    id,
  });
  if (!data) return <div>404</div>;

  return(
    <>
    <Head>
      <title>{'Vendor - ${data.description}'}</title>
    </Head>
    <div className="flex grow flex-col overflow-y-scroll">
          <VendorView {...data} key={data.id} />
      </div>
    </>
  )

}


export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.vendors.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SingleVendorPage;
