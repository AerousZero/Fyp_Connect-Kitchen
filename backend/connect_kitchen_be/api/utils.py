import jwt
from django.conf import settings
from rest_framework_simplejwt.exceptions import TokenError

def decode_token(authorization_header):
    if authorization_header and authorization_header.startswith('Bearer '):
        token_string = authorization_header.split(' ')[1]
        try:
            decoded_payload = jwt.decode(token_string, settings.SECRET_KEY, algorithms=['HS256'])
            return decoded_payload['user_id']
        except jwt.ExpiredSignatureError:
            raise TokenError('Token has expired')
        except jwt.InvalidTokenError:
            raise TokenError('Invalid token')
        except jwt.InvalidAlgorithmError:
            raise TokenError('Unsupported token algorithm')
        except jwt.InvalidIssuerError:
            raise TokenError('Invalid token issuer')
        except jwt.DecodeError:
            raise TokenError('Token decoding failed')
    else:
        raise TokenError('Authorization header missing or invalid')
