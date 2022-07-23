from django import forms

class MessageForm(forms.Form):
    text = forms.CharField(max_length=1048576, required=False, )
    room = forms.CharField(max_length=1024, required=True, )
    time = forms.TimeField(required=False)
    date = forms.DateField(required=False)
    seed = forms.CharField(max_length=128, required=False,)
    field_name = forms.ImageField(max_length=100, required=False)
