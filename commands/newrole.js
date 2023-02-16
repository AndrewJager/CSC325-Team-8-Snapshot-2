const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newrole')
		.setDescription('Create a new general role')
		.addStringOption((option) => option.setName('name').setDescription('The class dept (without the class number)').setRequired(true))
		.addStringOption((option) => option.setName('color').setDescription('Enter a hexcode for the color of the role').setRequired(true)),
	
    
        async execute(interaction) {
		const name = interaction.options.getString('name');
		const color = interaction.options.getString('color');
		
		
		interaction.guild.roles.create({
			name: name,
			color: color,
			permissions: 
				[PermissionsBitField.Flags.SendMessages,
				PermissionsBitField.Flags.ViewChannel,
				PermissionsBitField.Flags.ReadMessageHistory,
				PermissionsBitField.Flags.UseApplicationCommands,
				PermissionsBitField.Flags.ChangeNickname,
				PermissionsBitField.Flags.AddReactions, 
				PermissionsBitField.Flags.AttachFiles],
		})
		await interaction.reply({ content: 'Created a new role: ' + name, ephemeral:true });
	},
};