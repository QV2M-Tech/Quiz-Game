// components/TableRowWithActions.tsx

import { TableRow, TableCell } from "@/components/ui/table";
import TableActions from "./TableActions";
import CategoryBadge from "./ui/badge/CategoryBadge";

const TableRowWithActions = ({ item }: { item: any }) => (
	<TableRow key={item._id}>
		<TableCell>{item.topic}</TableCell>
		<TableCell>
			<CategoryBadge category={item.category} />
		</TableCell>
		<TableActions />
	</TableRow>
);

export default TableRowWithActions;
