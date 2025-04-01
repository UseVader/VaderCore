import { HttpException } from '@nestjs/common';
import { RESTError } from './types/RESTError';

export function throwHTTPErr(errorData: RESTError): never {
  const { message, statusCode } = errorData;
  throw new HttpException(message, statusCode);
}

export function validateCommand(command: string) {
  // List of dangerous commands and patterns
  const dangerousPatterns = [
    'rm',
    'mv',
    'cp',
    'chmod',
    'chown',
    'unlink', // File manipulation
    'shutdown',
    'reboot',
    'halt',
    'poweroff', // System shutdown/restart
    'mkfs',
    'dd',
    'fdisk',
    'parted',
    'resize2fs',
    'fsck', // Disk operations
    'ifconfig',
    'ip',
    'route',
    'iptables', // Network configuration
    'kill',
    'killall',
    'pkill',
    'nice',
    'renice', // Process management
    'apt-get',
    'apt',
    'yum',
    'dnf',
    'dpkg',
    'rpm',
    'brew', // Package management
    'wget',
    // 'curl',
    'tar', // Other potentially dangerous commands
  ];

  // Check if any dangerous pattern exists in the command
  for (let i = 0; i < dangerousPatterns.length; i++) {
    const pattern = new RegExp(`\\b${dangerousPatterns[i]}\\b`, 'i');
    console.log(pattern.test(command), command);
    if (pattern.test(command)) {
      return false; // Command is invalid (contains dangerous command)
    }
  }

  return true; // Command is valid (does not contain dangerous commands)
}
