import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

type Props = {
  field: string;
  sortField: string | null;
  sortOrder: "asc" | "desc" | null;
};

export default function SortIcon({ field, sortField, sortOrder }: Props) {
  if (sortField !== field) return <FaSort className="opacity-30" />;
  return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
}
