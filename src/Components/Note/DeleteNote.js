import React, { Component } from 'react';

function deleteNote(noteId, callback) {
    fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
        method: 'DELETE',   
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        })
        .then(data => {
            callback(noteId)
        })
        .catch(error => {
            console.error(error)
        })
}

