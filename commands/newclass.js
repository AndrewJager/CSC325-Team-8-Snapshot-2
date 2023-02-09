const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newclass')
		.setDescription('Create a class')
		.addStringOption((option) => option.setName('dept').setDescription('The class dept (without the class number)').setRequired(true))
		.addStringOption((option) => option.setName('classcode').setDescription('The class number (without the dept)').setRequired(true))
		.addStringOption((option) => option.setName('semester').setDescription('The class semester (example: "Fall 2022"').setRequired(true)),
	async execute(interaction) {
		const dept = interaction.options.getString('dept').toUpperCase();
		const course = interaction.options.getString('classcode');
		const semester = interaction.options.getString('semester');

        const studentsRole = course + " Students";
        const veteranRole = course + " Veteran";

        if (interaction.guild.roles.cache.find(role => role.name == studentsRole) && 
            interaction.guild.roles.cache.find(role => role.name == veteranRole)) {
                await interaction.reply({ content: 'Sorry, but that class already exists.', ephemeral: true});
        } else {
            
            await interaction.guild.roles.create({
                name: studentsRole,
                permissions: [PermissionsBitField.Flags.SendMessages,
                              PermissionsBitField.Flags.ViewChannel,
                              PermissionsBitField.Flags.ReadMessageHistory,
                              PermissionsBitField.Flags.UseApplicationCommands,
                              PermissionsBitField.Flags.ChangeNickname,
                              PermissionsBitField.Flags.AddReactions, 
                              PermissionsBitField.Flags.AttachFiles],
                color: Math.floor(Math.random() * (0xFFFFFF + 1))
            });
            await interaction.guild.roles.create({
                name: veteranRole,
                permissions: [PermissionsBitField.Flags.SendMessages,
                              PermissionsBitField.Flags.ViewChannel,
                              PermissionsBitField.Flags.ReadMessageHistory,
                              PermissionsBitField.Flags.UseApplicationCommands,
                              PermissionsBitField.Flags.ChangeNickname,
                              PermissionsBitField.Flags.AddReactions, 
                              PermissionsBitField.Flags.AttachFiles],
                color: Math.floor(Math.random() * (0xFFFFFF + 1))
            });

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
                            + ' ' + course + ' in semester ' + semester, ephemeral: true });
            }
	},
};