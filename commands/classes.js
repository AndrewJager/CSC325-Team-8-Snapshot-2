const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('classes')
		.setDescription('Lists all active classes'),
	async execute(interaction, database) {
		database.getAllCourses().then(courses => {
			let msg = '';
			courses.forEach(course => {
				msg = msg + course.dept + course.code + ' - ' + course.semester + '\n';
			});
			interaction.reply(msg);
		});
		
	},
};
