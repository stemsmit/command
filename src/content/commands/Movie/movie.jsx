import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import {mountReactComponent} from 'content/commands/mount'

import * as Types from 'content/types'
import * as Search from 'content/components/Search'
import Container from 'content/components/Container'
import dotenv from 'dotenv';

dotenv.config()

const API_BASE = 'https://api-v2launch.trakt.tv/search'
const TRAKT_BASE = 'https://trakt.tv/movies/'
const TRAKT_API_KEY = proces.env.TRAKT_API_KEY

let search = (query, options={}) => {
	return $.ajax({
		url: API_BASE,
		data: {
			q: query,
			type: 'movie'
		},
		headers: {
			"content-type":"application/json",
			"trakt-api-version": "2",
			"trakt-api-key": TRAKT_API_KEY
		}
	}).then((data) => {
		return data;
	});
}

let MovieResult = (props) => {
	let img = [];
	if(props.movie.images.post.thumb)
		img.push(<img src={props.movie.images.post.thumb} />);

	return (
		<div>
			{img}
			<p>{props.movie.title}</p>
		</div>
	)
}

class Movie extends React.Component {
	onSelect(result){
		this.props.onDone(new Types.Link({
			href: TRAKT_BASE + result.ids.slug
		}))
	}
	render(){
		return (
			<Container {...this.props}>
				<Search.Widget
					placeholder="Search Trakt.tv..."
					onSearch={search}
					onSelect={this.onSelect.bind(this)}
					onEsc={this.props.onDone}
					ResultClass={MovieResult}
					columns={2}
				/>
			</Container>
		)
	}
}
Movie.propTypes = {
  onDone: React.PropTypes.func.isRequired
}
export let match = "movie"
export let icon = require("./trakt.png")
export let mount = mountReactComponent.bind(null,Movie)