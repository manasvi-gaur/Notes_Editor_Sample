from .models import User

def getUserService(request):
 try:
  data = request.data
  id = data.get('id', None)
  user = User.objects.get(id = id)
  return user
 except:
  return None

def getLoginUserService(request):
 data = request.data
 email = data.get('email', None)
 password = data.get('password', None)
 try:
  user = User.objects.get(email = email, password = password)
  return user
 except:
  return None