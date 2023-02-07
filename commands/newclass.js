const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newclass')
		.setDescription('Create a class')
		.addStringOption((option) => option.setName('dept').setDescription('The class dept (without the class number)').setRequired(true))
		.addStringOption((option) => option.setName('classcode').setDescription('The class number (without the dept)').setRequired(true))
		.addStringOption((option) => option.setName('semester').setDescription('The class semester (example: "Fall 2022"').setRequired(true)),
	async execute(interaction) {
		const dept = interaction.options.getString('dept');
		const course = interaction.options.getString('classcode');
		const semester = interaction.options.getString('semester');

        interaction.guild.channels.create({
            name: dept + ' ' + course + ' - ' + semester,
            type: ChannelType.GuildCategory,
        }).then(category => {
            interaction.guild.channels.create({
                name: 'announcements-' + course,
                type: ChannelType.GuildText,
                parent: category.id,
            });
            interaction.guild.channels.create({
                name: 'zoom-meeting-info-' + course,
                type: ChannelType.GuildText,
                parent: category.id,
            });
            interaction.guild.channels.create({
                name: 'how-to-make-a-video',
                type: ChannelType.GuildText,
                parent: category.id,
            });
            interaction.guild.channels.create({
                name: 'introduce-yourself',
                type: ChannelType.GuildText,
                parent: category.id,
            });
            interaction.guild.channels.create({
                name: 'chat',
                type: ChannelType.GuildText,
                parent: category.id,
            });
        });

		await interaction.reply({ content: 'Created class ' + dept
                        + course + ' in semester ' + semester, fetchReply: true });
	},
};