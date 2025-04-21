<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCompanyRequest;
use Exception;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Rules\Password;
use App\Models\Company;


class UserController extends Controller
{
    public function login(Request $request)
    {
        try {
            // TODO : Validate Request
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            // TODO : Find user by email
            $credentials = request(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return ResponseFormatter::error('Unauthorized', 401);
            }

            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                throw new Exception('Invalid password');
            }

            // TODO : Generate Token
            $tokenResult = $user->createToken('authToken')->plainTextToken;

            // TODO : Return response
            return ResponseFormatter::success([
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'user' => $user
            ], 'login success');
        } catch (\Exception $e) {
            return ResponseFormatter::error('Authentication failed');
        }
    }

    public function register(Request $request)
    {
        try {
            // TODO : Validate Request
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', new Password],
            ]);

            // TODO : Create User
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // TODO : Generate Token
            $tokenResult = $user->createToken('authToken')->plainTextToken;

            // TODO : Return response
            return ResponseFormatter::success([
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'user' => $user
            ], 'User registered successfully');
        } catch (Exception $e) {
            return ResponseFormatter::error($e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        //Revoke Token
        $token = $request->user()->currentAccessToken()->delete();

        //Return Response
        return ResponseFormatter::success($token, 'Logout success');
    }

    public function fetch(Request $request)
    {
        //Get User
        $user = $request->user();

        //Return Response
        return ResponseFormatter::success($user, 'User data fetched successfully');
    }


    public function all()
    {
        $users = User::all();

        return ResponseFormatter::success($users, 'All users fetched successfully');
    }
}
