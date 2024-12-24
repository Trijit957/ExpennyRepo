import React from "react";
import TabsLayout from "../tabs-layout/tabs-layout";
import AddManualTransaction from "./add-manual-transaction";
import CsvUploadTransaction from "./csv-upload-transaction";

function AddTransactionLayout() {
	return (
		<TabsLayout
			tabsClassName="mt-5"
			tabInfo={[
				{
					label: "Manual",
					value: "manual",
					component: <AddManualTransaction />,
				},
				{
					label: "CSV upload",
					value: "csv-upload",
					component: <CsvUploadTransaction />,
				},
			]}
		/>
	);
}

export default AddTransactionLayout;
