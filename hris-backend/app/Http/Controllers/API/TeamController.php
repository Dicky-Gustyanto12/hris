<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\Team;
use Illuminate\Http\Request;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTeamRequest;
use App\Http\Requests\UpdateTeamRequest;

class TeamController extends Controller
{
    public function create(CreateTeamRequest $request)
    {
        try {
            $path = null;

            if ($request->hasFile('icon')) {
                // ✅ Simpan ke storage/app/public/icons
                $path = $request->file('icon')->store('icons', 'public');
            }

            $team = Team::create([
                'name' => $request->name,
                'icon' => $path,
                'company_id' => $request->company_id,
            ]);

            if (!$team) {
                throw new Exception('Team creation failed');
            }

            // ✅ Konversi path icon ke URL publik
            $team->icon = $team->icon ? asset('storage/' . $team->icon) : null;

            return ResponseFormatter::success($team, 'Team created successfully');
        } catch (Exception $e) {
            return ResponseFormatter::error($e->getMessage(), 500);
        }
    }

    public function fetch(Request $request)
    {
        $id = $request->input('id');
        $name = $request->input('name');
        $limit = $request->input('limit', 10);

        $teamQuery = Team::withCount('employees');

        if ($id) {
            $team = $teamQuery->find($id);
            if ($team) {
                $team->icon = $team->icon ? asset('storage/' . $team->icon) : null;
                return ResponseFormatter::success($team, 'Team found');
            }
            return ResponseFormatter::error('Team not found', 404);
        }

        $teams = $teamQuery->where('company_id', $request->company_id);
        if ($name) {
            $teams->where('name', 'like', '%' . $name . '%');
        }

        $paginated = $teams->paginate($limit);

        // ✅ Konversi setiap icon ke URL publik
        $paginated->getCollection()->transform(function ($team) {
            $team->icon = $team->icon ? asset('storage/' . $team->icon) : null;
            return $team;
        });

        return ResponseFormatter::success($paginated, 'Teams found');
    }
}
