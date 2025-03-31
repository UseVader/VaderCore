import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ExecutionLogItem from "./ExecutionLogItem";
import { ExecutionLog } from "@/types/ExecutionLog";
import PaginationControls from "./PaginationControls";

interface ExecutionLogListProps {
  limit?: number;
}

const ExecutionLogList = ({ limit }: ExecutionLogListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 3;

  // Sample data - would come from an API in a real application
  const logs: ExecutionLog[] = [
    {
      id: "1",
      scriptId: "script-1",
      scriptName: "npm install",
      userId: "user-1",
      timestamp: "2025-03-20T15:30:00",
      stdout: "Successfully installed dependencies",
      stderr: "",
      environment: {
        os: "macOS",
        architecture: "arm64",
        nodeVersion: "v16.15.0",
        hostname: "dev-machine",
      },
    },
    {
      id: "2",
      scriptId: "script-2",
      scriptName: "npm run build",
      userId: "user-1",
      timestamp: "2025-03-20T14:45:00",
      stdout: "",
      stderr: "Error: Cannot find module",
      environment: {
        os: "macOS",
        architecture: "arm64",
        nodeVersion: "v16.15.0",
        hostname: "dev-machine",
      },
    },
    {
      id: "3",
      scriptId: "script-3",
      scriptName: "npm run lint",
      userId: "user-1",
      timestamp: "2025-03-20T14:15:00",
      stdout: "Warning: Unused variables detected",
      stderr: "",
      environment: {
        os: "macOS",
        architecture: "arm64",
        nodeVersion: "v16.15.0",
        hostname: "dev-machine",
      },
    },
    {
      id: "4",
      scriptId: "script-4",
      scriptName: "npm run test",
      userId: "user-1",
      timestamp: "2025-03-20T13:30:00",
      stdout: "All tests passed successfully",
      stderr: "",
      environment: {
        os: "macOS",
        architecture: "arm64",
        nodeVersion: "v16.15.0",
        hostname: "dev-machine",
      },
    },
    {
      id: "5",
      scriptId: "script-5",
      scriptName: "git pull",
      userId: "user-1",
      timestamp: "2025-03-19T16:20:00",
      stdout: "Already up-to-date",
      stderr: "",
      environment: {
        os: "macOS",
        architecture: "arm64",
        nodeVersion: "v16.15.0",
        hostname: "dev-machine",
      },
    },
  ];

  // Apply limit if provided, otherwise paginate
  const totalLogs = limit ? Math.min(logs.length, limit) : logs.length;
  const totalPages = limit ? 1 : Math.ceil(logs.length / logsPerPage);

  const startIndex = limit ? 0 : (currentPage - 1) * logsPerPage;
  const endIndex = limit
    ? totalLogs
    : Math.min(startIndex + logsPerPage, logs.length);

  const displayedLogs = logs.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Execution Logs</h3>

      {displayedLogs.map((log) => (
        <ExecutionLogItem key={log.id} log={log} />
      ))}

      {!limit && totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-6"
        />
      )}
    </div>
  );
};

export default ExecutionLogList;
