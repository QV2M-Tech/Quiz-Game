import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = ({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}) => (
	<div className="flex gap-4">
		<Input
			className="w-64"
			placeholder="ค้นหา"
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
		/>
		<Button
			variant="outline"
			className="hover:bg-secondary/20 border-secondary"
		>
			ตัวกรอง
		</Button>
		<Button variant="secondary">เพิ่มหัวข้อ</Button>
	</div>
);

export default SearchBar;
