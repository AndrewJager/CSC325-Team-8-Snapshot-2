const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionsBitField, ButtonStyle, ActionRowBuilder, ButtonBuilder, ActionRow, TeamMemberMembershipState } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('courses')
		.setDescription('assign courses to yourself')
		.addRoleOption(option => option.setName('role1').setDescription('1st role you want to add.').setRequired(true))
		.addRoleOption(option => option.setName(`role2`).setDescription('2nd role you want to add.').setRequired(true)),
		/*.addRoleOption(option => option.setName(`role3`).setDescription('3rd role you want to add.').setRequired(true))
		.addRoleOption(option => option.setName(`role4`).setDescription('4th role you want to add.').setRequired(true))
		.addRoleOption(option => option.setName(`role5`).setDescription('5th role you want to add.').setRequired(true))
		.addRoleOption(option => option.setName(`role6`).setDescription('6th role you want to add.').setRequired(true)),*/

	async execute(interaction, client) {

		const role1 = interaction.options.getRole('role1');
		const role2 = interaction.options.getRole(`role2`);
		/*const role3 = interaction.options.getRole(`role3`);
		const role4 = interaction.options.getRole(`role4`);
		const role5 = interaction.options.getRole(`role5`);
		const role6 = interaction.options.getRole(`role6`);*/
		

		const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setCustomId('button1')
				.setLabel(`${role1.name}`)
				.setStyle(ButtonStyle.Secondary),

            	 new ButtonBuilder()
                .setCustomId(`button2`)
                .setLabel(`${role2.name}`)
                .setStyle(ButtonStyle.Secondary),

        /*        new ButtonBuilder()
                .setCustomId(`button3`)
                .setLabel(`${role3.name}`)
                .setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                .setCustomId(`button4`)
                .setLabel(`${role4.name}`)
                .setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                .setCustomId(`button5`)
                .setLabel(`${role5.name}`)
                .setStyle(ButtonStyle.Secondary), */
            
			);
		/* const button2 = new ActionRowBuilder()
				.addComponents (
					new ButtonBuilder()
					.setCustomId('button6')
					.setLabel(`${role6.name}`)
					.setStyle(ButtonStyle.Secondary),
				) 
					*/
		const embed = new EmbedBuilder()
			.setTitle('Course Selection Tutorial')
            .setDescription('Read the steps carefully to ensure you that you get into the right class that you are registered for.')
			.setColor('Yellow')
			.addFields([
				{
					name: 'Step 1',
					value: 'Verify what classes you have with Professor Spradling in SIS or your Class Schedule.',
				},
				{
					name: 'Step 2',
					value: 'View the courses below and verify that the ones you need match the ones you are registered in SIS with.',
				},
				{
					name: 'Step 3',
					value: 'Click the button that is labelled after the class that you need. You will receive a message that will say that the role was successfully added.',
				},
				{
					name: 'Step 4',
					value: 'Verify that the channels you need access to were added to the sidebar after selecting the classes you need. You will see the left sidebar populate with channels after you click the buttons that are the classes you need.',
				},
			])
		await interaction.reply({ embeds: [embed], components: [button] });

		const collector = await interaction.channel.createMessageComponentCollector();

		collector.on('collect', async (i) => {
			const member = i.member;

			if (i.customId === 'button1') {
				member.roles.add(role1);
				i.reply({ content: 'Role added', ephemeral:true });
			}else if (i.customId === 'button2') {
				member.roles.add(role2);
				i.reply({ content: 'Role added', ephemeral:true });
			}/*else if (i.customId === 'button3') {
				member.roles.add(role3);
				i.reply({ content: 'Role added', ephemeral:true });
			}else if (i.customId === 'button4') {
				member.roles.add(role4);
				i.reply({ content: 'Role added', ephemeral:true });
			}else if (i.customId === 'button5') {
				member.roles.add(role5);
				i.reply({ content: 'Role added', ephemeral:true });
			}else if (i.customId === 'button6') {
				member.roles.add(role6);
				i.reply({ content: 'Role added', ephemeral:true });
			}*/
			else {
				i.reply({ content: 'nothing happened', ephemeral:true });
			}

		});
	},


};