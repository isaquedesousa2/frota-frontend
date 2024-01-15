module.exports = {
    apps: [
        {
            name: 'frota-production',
            script: '/home/medeiros/.nvm/versions/node/v18.15.0/bin/npm',
            args: 'start',
            exec_mode: 'fork',
            wait_ready: true,
            listen_timeout: 10000,
            out_file: './frota-out.log',
            error_file: './frota-error.log',
            merge_logs: true,
            log_date_format: 'DD-MM HH:mm:ss Z',
            log_type: 'json',
        },
    ],
};
