import React from 'react';
import {Box, Text} from 'ink';

const MAX_VISIBLE = 10;

export function CommandPicker({
	hints,
	selectedIndex,
}: {
	hints: string[];
	selectedIndex: number;
}): React.JSX.Element | null {
	if (hints.length === 0) {
		return null;
	}

	// Compute visible window around selectedIndex
	let start: number;
	if (hints.length <= MAX_VISIBLE) {
		start = 0;
	} else {
		// Center the selection in the window
		start = Math.min(
			Math.max(0, selectedIndex - Math.floor(MAX_VISIBLE / 2)),
			hints.length - MAX_VISIBLE,
		);
	}
	const end = Math.min(start + MAX_VISIBLE, hints.length);
	const visible = hints.slice(start, end);
	const hasMoreAbove = start > 0;
	const hasMoreBelow = end < hints.length;

	return (
		<Box flexDirection="column" borderStyle="round" borderColor="cyan" paddingX={1} marginBottom={0}>
			<Text dimColor bold> Commands</Text>
			{hasMoreAbove ? <Text dimColor>  ▲ {start} more</Text> : null}
			{visible.map((hint, i) => {
				const actualIndex = start + i;
				const isSelected = actualIndex === selectedIndex;
				return (
					<Box key={hint}>
						<Text color={isSelected ? 'cyan' : undefined} bold={isSelected}>
							{isSelected ? '\u276F ' : '  '}
							{hint}
						</Text>
						{isSelected ? <Text dimColor> [enter]</Text> : null}
					</Box>
				);
			})}
			{hasMoreBelow ? <Text dimColor>  ▼ {hints.length - end} more</Text> : null}
			<Text dimColor> {'\u2191\u2193'} navigate{'  '}{'\u23CE'} select{'  '}esc dismiss</Text>
		</Box>
	);
}
