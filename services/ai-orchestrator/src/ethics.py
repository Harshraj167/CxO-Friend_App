import re

class EthicsFilter:
    def __init__(self):
        # Simple regex patterns for PII masking
        self.email_pattern = re.compile(r'[\w\.-]+@[\w\.-]+')
        self.phone_pattern = re.compile(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b')
        self.ssn_pattern = re.compile(r'\b\d{3}-\d{2}-\d{4}\b')

    def mask_pii(self, text: str) -> str:
        """Zero-trust data pre-processing before sending to Cloud AI"""
        text = self.email_pattern.sub('[EMAIL_MASKED]', text)
        text = self.phone_pattern.sub('[PHONE_MASKED]', text)
        text = self.ssn_pattern.sub('[SSN_MASKED]', text)
        return text

    def detect_harmful_intent(self, text: str) -> bool:
        """Basic stub for harmful intent detection"""
        trigger_words = ['hack', 'steal', 'bypass']
        return any(word in text.lower() for word in trigger_words)
