this is top YEAH!!!!
<a href="{{ url('sub') }}">sub</a>

@if(session("simple_user_auth"))
    <p>Authenticated</p>
    <form method="post" action="{{ url('logout') }}">
        @csrf
        <input type="submit" value="LOGOUT" />
    </form>
@else
    @include("part.login_form")
@endif