    export default function getStatusColor(status)
    {
        switch (status) {
            case 'Online':
                return 'lime';
            case 'Offline':
                return 'gray';
            case 'Away':
                return 'gold';
            case 'Busy':
                return 'red';
            default:
                return 'gray'
        }
    }