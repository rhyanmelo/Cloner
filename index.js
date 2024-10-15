const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);

    try {
        const category = await client.channels.cache.get('1204205274462945323');
        const guild = client.guilds.cache.get('1235613408288575518');
        const channelsInCategory = category.children;

        const newCategory = await guild.channels.create(category.name, {
            type: 'GUILD_CATEGORY',
        });
        for (const channel of channelsInCategory.values()) {
            
            try {
                // Cria um novo canal dentro da categoria
                const newChannel = await guild.channels.create(channel.name, {
                    type: 'GUILD_TEXT',
                    parent: newCategory.id,
                });

                // Obtém todas as mensagens do canal atual
                const messages = await channel.messages.fetch({ limit: 100 });

                // Array para armazenar todas as promessas de envio de mensagens
                let messagePromises = [];

                try {
                    messages.forEach(message => {
                        // Verifica se a mensagem tem anexos e adiciona os URLs ao array
                        if (message.attachments.size > 0) {
                            message.attachments.forEach(attachment => {
                                messagePromises.push(newChannel.send({ files: [attachment.url] }));
                            });
                        }
                    });
                } catch (error) {

                }

                // Aguarda o envio de todas as mensagens antes de prosseguir para o próximo canal
                await Promise.all(messagePromises);

                console.log(`Canal "${newChannel.name}" criado e mensagens enviadas.`);
            } catch (error) {
                console.error(`Erro ao processar canal "${channel.name}":`, error);
            }
        }

        console.log('Todos os canais foram criados e as mensagens foram enviadas.');
    } catch (error) {
        console.error('Erro ao processar mensagens:', error);
    }
});

client.login('MTI5MDc5Njg0NDE3MTAwNjAzNA.G2IyrM.1EWYMOD6Zipdq6LWlCTFSLEgcqrwf2eOlQ9Ek4');
