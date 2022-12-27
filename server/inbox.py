import imaplib, email, os

def getMails(user, password, imap_url):
    connection = imaplib.IMAP4_SSL(imap_url)
    connection.login(user, password)
    result, data = connection.uid('search', None, "ALL")
    if result == 'OK':
        for num in data[0].split():
            result, data = connection.uid('fetch', num, '(RFC822)')
            if result == 'OK':
                email_message = email.message_from_bytes(data[0][1])
                print('From:' + email_message['From'])
                print('To:' + email_message['To'])
                print('Date:' + email_message['Date'])
                print('Subject:' + str(email_message['Subject']))
                print('Content:' + str(email_message.get_payload()[0]))
    connection.close()
    connection.logout()