<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UpdateEvent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:event';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cập nhật cuộc hẹn kết thúc khi đã quá thời gian diễn ra.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $now = date('Y-m-d H:i:s');

        \App\Event::where([
            ['status', '=', 'forthcoming'],
            ['start_time', '<=', $now]
        ])->update([
            'status' => 'finished',
            'updated_at' => $now
        ]);
        $this->info("Thành công!");
    }
}
