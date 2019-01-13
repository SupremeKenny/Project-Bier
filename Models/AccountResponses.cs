using System;
using System.Collections.Generic;

class RegisterResponse
{
    public bool Success { get; set; }
    public List<string> Errors { get; set; }
}

class LoginResponse
{
    public bool Success { get; set; }
    public string Error { get; set; }
    public string Token { get; set; }
}

class AddressResponse
{
    public string City { get; set; }
    public string Street { get; set; }
    public string Province { get; set; }
}