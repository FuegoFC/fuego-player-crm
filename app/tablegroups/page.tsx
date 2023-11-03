import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableFour from "@/components/Tables/TableFour";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableTwo />
        <TableThree />
        <TableFour />
      </div>
    </>
  );
};

export default TablesPage;