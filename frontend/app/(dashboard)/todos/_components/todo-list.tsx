import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Todo } from '@/typings';

interface Props {
  data: Todo[];
}

export default function TodoList({ data }: Props) {
  return (
    <div className="container mx-auto p-6 bg-white shadow rounded">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <Input
            className="border p-2 rounded w-1/3"
            placeholder="Filter tasks..."
          />
          <div className="flex space-x-2">
            <Button
              className="flex items-center space-x-1"
              variant="outline"
            >
              <BadgeIcon className="h-4 w-4" />
              <span>Status</span>
            </Button>

          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]" />
              <TableHead className="w-[150px]">Task</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
              {data?.map((todo: Todo) => (
            <TableRow key={todo.id}>
                 <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell className="font-medium">TASK-8782</TableCell>
              <TableCell>
                {todo.title}
              </TableCell>
              <TableCell>
                    <Badge variant="secondary">PENDING</Badge>
              </TableCell>
              <TableCell>Medium</TableCell>
              <TableCell>
                <MoreHorizontalIcon className="h-6 w-6" />
              </TableCell>
            </TableRow>
              ))}

          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function BadgeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  );
}

function KeyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

function MoreHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}