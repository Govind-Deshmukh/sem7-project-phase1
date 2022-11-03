import pandas as pd


def extractEmails(df):
    """Extracts emails from a dataframe and returns a list of emails"""
    emails = []
    for email in df['email']:
        emails.append(email)
    return emails