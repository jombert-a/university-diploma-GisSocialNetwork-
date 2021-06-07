import React from 'react';
import * as signalR from '@microsoft/signalr/dist/browser/signalr.min';

const GHub = props => {
    const token = sessionStorage.getItem('token');
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/chat", { accessTokenFactory: () => token })
        .build();

    return (
        <></>
    )
}