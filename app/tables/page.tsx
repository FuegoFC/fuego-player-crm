"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PlayerTable from "@/components/Tables/PlayerTable";

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

      <div className="flex flex-col gap-10 w-full h-8/12">
        <PlayerTable />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </>
  );
};

export default TablesPage;
