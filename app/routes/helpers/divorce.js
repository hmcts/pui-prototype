function getCaseActions(_case) {
	return [
		{
			href: `/app/case/${_case.id}/make-decision`,
			text: 'Make decision'
		},
		{
			href: `/app/case/${_case.id}/mark-as-prepared`,
			text: 'Mark as prepared'
		},
		{
			href: `/app/case/${_case.id}/reassign`,
			text: 'Reassign'
		}
	]
}

exports.getCaseActions = getCaseActions;