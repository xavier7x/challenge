<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Notifications\ClientNotification;
use Illuminate\Support\Facades\Notification;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:clients',
            'phone' => 'required',
            'enroll_number' => 'required',
            'date_of_payment' => 'required|date',
        ]);

        $client = Client::create($request->all());

        try {
            Notification::route('mail', 'xaviermorenoaviles@gmail.com')->notify(new ClientNotification($client, 'created'));
        } catch (\Exception $e) {
            // Handle exception here
            // For example, you could log the error, send an alert to the admin, etc.
            return response()->json(['message' => 'Cliente creado pero la notificación no se ha enviado debido a un error de envío de correo electrónico.', "error"=>$e], 201);
        }

        return response()->json($client, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return response()->json($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone' => 'required',
            'enroll_number' => 'required',
            'date_of_payment' => 'required|date',
        ]);

        $client->update($request->all());
        try {
            Notification::route('mail', 'xaviermorenoaviles@gmail.com')->notify(new ClientNotification($client, 'updated'));
        } catch (\Exception $e) {
            // Handle exception here
            // For example, you could log the error, send an alert to the admin, etc.
            return response()->json(['message' => 'Cliente actualizado pero la notificación no se ha enviado debido a un error de envío de correo electrónico.',"data"=>$client,"error"=>$e], 201);
        }
        return response()->json($client);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json([
            'message' => 'Client deleted with success.',
            'status' => 'success'
        ], 200);
        Notification::route('mail', 'xaviermorenoaviles@gmail.com')->notify(new ClientNotification($client, 'deleted'));

        return response()->json(null, 204);
    }
}
