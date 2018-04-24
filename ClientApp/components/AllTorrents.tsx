import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface AllTorrentsState {
    torrents : Torrent[];
    loading: boolean;
}

export class AllTorrents extends React.Component<RouteComponentProps<{}>, AllTorrentsState> {
    constructor() {
        super();
        this.state = { torrents: [], loading: true };

        // Get torrent list
        fetch('api/torrent')
            .then(response => response.json() as Promise<Torrent[]>)
            .then(data => {
                this.setState({ torrents: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : AllTorrents.renderTorrentsTable(this.state.torrents);

        return <div>
            <h1>All Torrents</h1>
            {contents}
        </div>;
    }

    private static renderTorrentsTable(torrents: Torrent[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                { torrents.map(torrent =>
                <tr key={ torrent.hash }>
                    <td>{ torrent.hash}</td>
                    <td>{ torrent.name}</td>
                    <td>{ torrent.state}</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}

interface Torrent {
    hash: string;
    name: string;
    size: number;
    progress: number;
    dlspeed: number;
    upspeed: number;
    priority: number;
    num_seeds: number;
    num_complete: number;
    num_leechs: number;
    num_incomplete: number;
    ratio: number;
    eta: number;
    seq_dl: boolean;
    f_l_piece_prio: boolean;
    category: string;
    super_seeding: boolean;
    force_start: boolean;
    state: string;
}
