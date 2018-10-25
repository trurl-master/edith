import React from 'react';
import { storiesOf } from '@storybook/react';

import { Edith, EdithImport, EdithAddBlock } from '../lib';
import EdithBlockCustomText from './custom/CustomText';

import './styles/main.less';

import content1 from './content/1.html';
import content2 from './content/2.html';

storiesOf('Edith', module)
	.add('A book', () => {
		return (
			<div className="container">
				<Edith
					import={EdithImport.fromHTML(content1)}
					classes={{
						root: 'my-edithor'
					}}
					strings={{
						controls: {
							save: 'Save'
						},
						block: {
							ctrl: {
								grab: 'Grab',
								clone: 'Clone',
								remove: 'Remove'
							}
						},
						block_panel: {
							expand: '+',
							put: 'Put'
						}
					}}
					blocks={[
						{
							name: 'H1',
							label: 'Title',
							config: {
								toolbar: [
									{ label: 'I', style: 'ITALIC' },
									{ label: 'U', style: 'UNDERLINE' },
								]
							}
						},
						{
							name: 'Text',
							label: 'Text',
							config: {
								toolbar: [
									{ label: 'B', style: 'BOLD' },
									{ label: 'I', style: 'ITALIC' },
									{ label: 'U', style: 'UNDERLINE' },
								]
							}
						},
						{
							name: 'InlineImage',
							label: 'Image',
							config: {
								accept: 'image/*',
								placeholder: 'Drop your image here'
							}
						},
						{
							name: 'Quote',
							label: 'Quote',
							config: {
								toolbar: [
									{ label: 'B', style: 'BOLD' },
									{ label: 'I', style: 'ITALIC' },
									{ label: 'U', style: 'UNDERLINE' },
								]
							}
						}
					]}
					onSave={content => {
					}}
				/>
			</div>
		)
	})
	.add('Custom Block', () => {

		EdithAddBlock('Custom Text', EdithBlockCustomText);

		return (
			<div className="container">
				<Edith
					import={EdithImport.fromHTML(content2)}
					strings={{
						controls: {
							save: 'Save'
						},
						block: {
							ctrl: {
								grab: 'Grab',
								clone: 'Clone',
								remove: 'Remove'
							}
						},
						block_panel: {
							expand: '+',
							put: 'Put'
						}
					}}
					blocks={[
						{
							name: 'H1',
							label: 'Title',
							config: {
								toolbar: [
									{ label: 'I', style: 'ITALIC' },
									{ label: 'U', style: 'UNDERLINE' },
								]
							}
						},
						{
							name: 'Text',
							label: 'Text',
							config: {
								toolbar: [
									{ label: 'B', style: 'BOLD' },
									{ label: 'I', style: 'ITALIC' },
									{ label: 'U', style: 'UNDERLINE' },
								]
							}
						},
						{
							name: 'Custom Text',
							label: 'Custom Text'
						}
					]}
					onSave={content => {

					}}
				/>
			</div>
		)
	})