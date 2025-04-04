import { CommandType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const commands = [
    // System Information
    {
      title: 'Get OS Information',
      cmd: 'uname -s && uname -r && uname -m',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description:
        'Displays operating system name, kernel version, and machine hardware name',
    },
    {
      title: 'Get CPU Information',
      cmd: 'lscpu | grep "Model name"',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Shows detailed information about the CPU model',
    },
    {
      title: 'Get Memory Usage',
      cmd: 'free -h | grep Mem | awk \'{print $3 "/" $2}\'',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays current memory usage in human-readable format',
    },
    {
      title: 'Get Disk Usage',
      cmd: 'df -h / | grep / | awk \'{print $3 "/" $2 " (" $5 " used)"}\'',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Shows disk usage statistics for the root partition',
    },
    {
      title: 'Get Shell Information',
      cmd: '$SHELL --version',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays the version of the current shell',
    },

    // Node.js & NPM Information
    {
      title: 'Get Node.js Version',
      cmd: 'node -v',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Shows the installed Node.js version',
    },
    {
      title: 'Get NPM Version',
      cmd: 'npm -v',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays the installed NPM version',
    },
    {
      title: 'Get Installed Dependencies',
      cmd: 'jq -r \'.dependencies | to_entries | map("\\(.key)@\\(.value)") | .[]\' package.json',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description:
        'Lists all dependencies with their versions from package.json',
    },

    // Network & Connectivity Checks
    {
      title: 'Check Internet Connectivity',
      cmd: 'ping -c 3 8.8.8.8',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Tests internet connectivity by pinging Google DNS',
    },
    {
      title: 'Check DNS Resolution',
      cmd: 'nslookup google.com',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Verifies DNS resolution by looking up google.com',
    },
    {
      title: 'Check Open Ports (Requires netstat)',
      cmd: 'netstat -tulnp 2>/dev/null || ss -tulnp',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: true,
      description: 'Lists all listening ports and associated processes',
    },
    {
      title: 'Check Localhost Availability',
      cmd: 'curl -I http://localhost:3000 || echo "Service not available"',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Tests if localhost port 3000 is responding',
    },

    // Git & Version Control Checks
    {
      title: 'Get Git Version',
      cmd: 'git --version',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays the installed Git version',
    },
    {
      title: 'Check Git Remote URL',
      cmd: 'git remote -v',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Lists all configured Git remote repositories',
    },
    {
      title: 'Check Uncommitted Changes',
      cmd: 'git status --short',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Shows a summary of uncommitted changes in the repository',
    },

    // Docker & Kubernetes Checks
    {
      title: 'Get Docker Version',
      cmd: 'docker -v',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays the installed Docker version',
    },
    {
      title: 'List Running Docker Containers',
      cmd: 'docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description:
        'Shows a formatted list of currently running Docker containers',
    },
    {
      title: 'List All Docker Containers',
      cmd: 'docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Lists all Docker containers including stopped ones',
    },
    {
      title: 'Get Kubernetes Cluster Info',
      cmd: 'kubectl cluster-info',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays information about the Kubernetes cluster',
    },
    {
      title: 'List Kubernetes Pods',
      cmd: 'kubectl get pods -A',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Lists all pods across all namespaces in the cluster',
    },

    // Environment Variables
    {
      title: 'Check Specific Environment Variable',
      cmd: 'echo $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: false,
      description: 'Displays the value of a specified environment variable',
    },

    // Python & PIP Information
    {
      title: 'Get Python Version',
      cmd: 'python3 --version',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Shows the installed Python version',
    },
    {
      title: 'Get PIP Version',
      cmd: 'pip3 --version',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays the installed PIP version',
    },
    {
      title: 'List Installed Python Packages',
      cmd: 'pip3 list',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Lists all installed Python packages and their versions',
    },

    // Security & User Context
    {
      title: 'Check Current User',
      cmd: 'whoami',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays the username of the current user',
    },

    // System Uptime
    {
      title: 'Check System Uptime',
      cmd: 'uptime -p',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Shows how long the system has been running',
    },

    // Time & Date
    {
      title: 'Get System Date & Time',
      cmd: 'date',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Displays the current system date and time',
    },
    {
      title: 'Get Timezone',
      cmd: 'timedatectl | grep "Time zone"',
      type: CommandType.PREDEFINED,
      isInputRequired: false,
      requiresUserWarning: false,
      description: 'Shows the current system timezone',
    },

    // Additional Commands from Previous Object

    {
      title: 'Get Disk Usage for Specific Directory',
      cmd: 'df -h $1 | grep / | awk \'{print $3 "/" $2 " (" $5 " used)"}\'',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: false,
      description: 'Shows disk usage statistics for a specified directory',
    },
    {
      title: 'Search for a Process by Name',
      cmd: 'ps aux | grep $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: false,
      description: 'Finds processes matching the specified name',
    },
    {
      title: 'Check Disk Space for Specific Directory',
      cmd: 'du -sh $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: false,
      description: 'Calculates total disk space used by a specific directory',
    },
    {
      title: 'Check Specific Service Status',
      cmd: 'systemctl status $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description: 'Shows the current status of a specified system service',
    },
    {
      title: 'Check the Last Login for User',
      cmd: 'last $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: false,
      description: 'Displays login history for a specific user',
    },
    {
      title: 'Find Files by Name',
      cmd: 'find / -name "$1"',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description:
        'Searches for files with the specified name across the system',
    },
    {
      title: 'Get the Version of a Specific Package',
      cmd: 'dpkg -l | grep $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description: 'Shows the installed version of a specific package',
    },
    {
      title: 'Check Docker Container Status',
      cmd: 'docker ps -a | grep $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description: 'Finds Docker containers matching the specified name',
    },
    {
      title: 'View Docker Container Logs',
      cmd: 'docker logs $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description: 'Displays logs from a specific Docker container',
    },
    {
      title: 'Inspect Docker Image',
      cmd: 'docker inspect $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description: 'Shows detailed information about a specific Docker image',
    },
    {
      title: 'Check Docker Container Resource Usage',
      cmd: 'docker stats $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description:
        'Displays resource usage statistics for a specific container',
    },
    {
      title: 'Check Systemd Service Status',
      cmd: 'systemctl status $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description: 'Shows the current status of a specified systemd service',
    },
    {
      title: 'Check Installed Version of a Package',
      cmd: 'dpkg -l | grep $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: true,
      description: 'Finds the installed version of a specific package',
    },
    {
      title: 'Get Kubernetes Pod Logs',
      cmd: 'kubectl logs $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: false,
      description: 'Retrieves logs from a specific Kubernetes pod',
    },
    {
      title: 'Get Kubernetes Pod Status',
      cmd: 'kubectl get pod $1',
      type: CommandType.PREDEFINED,
      isInputRequired: true,
      requiresUserWarning: false,
      description: 'Shows detailed status information for a specific pod',
    },

    // 🖥️ System Information
    {
      title: 'Get OS Name & Version',
      cmd: 'cat /etc/os-release | grep -E "NAME|VERSION"',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Displays the operating system name and version details',
    },
    {
      title: 'Get Kernel Version',
      cmd: 'uname -r',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Shows the current kernel version',
    },
    {
      title: 'Get CPU Architecture',
      cmd: 'uname -m',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Displays the machine hardware architecture',
    },
    {
      title: 'Get Total Memory',
      cmd: "free -h | grep Mem | awk '{print $2}'",
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Shows the total amount of system memory',
    },
    {
      title: 'Get Disk Usage (Root Partition)',
      cmd: 'df -h / | awk \'NR==2 {print $3 "/" $2 " (" $5 " used)"}\'',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Displays disk usage statistics for the root partition',
    },
    {
      title: 'List Mounted File Systems',
      cmd: 'mount | column -t',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description:
        'Shows all currently mounted file systems in a tabular format',
    },
    {
      title: 'List Block Storage Devices',
      cmd: 'lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists all block storage devices with their properties',
    },

    // 🌐 Network Information
    {
      title: 'Get Hostname',
      cmd: 'hostname',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Displays the system hostname',
    },
    {
      title: 'Get Local IP Address',
      cmd: "hostname -I | awk '{print $1}'",
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Shows the primary local IP address',
    },
    {
      title: 'List Active Network Interfaces',
      cmd: 'ip -br a',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists all active network interfaces and their IP addresses',
    },
    {
      title: 'Check Default Gateway',
      cmd: 'ip r | grep default',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Shows the default network gateway',
    },
    {
      title: 'Check DNS Servers',
      cmd: 'cat /etc/resolv.conf | grep nameserver',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists configured DNS servers',
    },

    // 🔧 Process & Performance Monitoring
    {
      title: 'Get System Load Average (Last 1, 5, 15 min)',
      cmd: 'uptime | awk -F "load average:" \'{print $2}\'',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description:
        'Displays system load averages for the past 1, 5, and 15 minutes',
    },
    {
      title: 'Get Top 5 CPU-Consuming Processes',
      cmd: 'ps -eo pid,comm,%cpu --sort=-%cpu | head -6',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists the top 5 processes by CPU usage',
    },
    {
      title: 'Get Top 5 Memory-Consuming Processes',
      cmd: 'ps -eo pid,comm,%mem --sort=-%mem | head -6',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists the top 5 processes by memory usage',
    },

    // 🔍 Logs & System State (Read-Only)
    {
      title: 'Last System Boot Time',
      cmd: 'who -b',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Shows when the system was last booted',
    },
    {
      title: 'Check Last 5 System Reboots',
      cmd: 'last reboot | head -5',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists the 5 most recent system reboots',
    },
    {
      title: 'Check Kernel Log Messages (Last 10 Entries)',
      cmd: 'dmesg | tail -10',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Shows the 10 most recent kernel log messages',
    },

    // 🛠 Package & Software Version Checks
    {
      title: 'Get Installed Node.js Version',
      cmd: 'node -v',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Displays the installed Node.js version',
    },
    {
      title: 'Get Installed NPM Version',
      cmd: 'npm -v',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Shows the installed NPM version',
    },
    {
      title: 'Get Installed Python Version',
      cmd: 'python3 --version',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Displays the installed Python version',
    },
    {
      title: 'Get Installed PIP Version',
      cmd: 'pip3 --version',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Shows the installed PIP version',
    },
    {
      title: 'Get Installed Docker Version',
      cmd: 'docker -v',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Displays the installed Docker version',
    },
    {
      title: 'List Running Docker Containers',
      cmd: 'docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description:
        'Shows a formatted list of currently running Docker containers',
    },
    {
      title: 'List All Docker Containers',
      cmd: 'docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists all Docker containers including stopped ones',
    },
    {
      title: 'Check Kubernetes Cluster Info',
      cmd: 'kubectl cluster-info',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Displays information about the Kubernetes cluster',
    },
    {
      title: 'List Kubernetes Nodes',
      cmd: 'kubectl get nodes',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists all nodes in the Kubernetes cluster',
    },
    {
      title: 'List Kubernetes Pods (All Namespaces)',
      cmd: 'kubectl get pods -A',
      type: CommandType.PREDEFINED,
      requiresUserWarning: false,
      description: 'Lists all pods across all namespaces in the cluster',
    },
  ];

  const uniqueCommands = Array.from(
    new Map(commands.map((command) => [command.cmd, command])).values(),
  );

  await prisma.command.createMany({
    data: uniqueCommands,
  });
  console.log({ uniqueCommands });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
