var foo = function foo(bar)
{
	var t = (bar==='hi');
    return (bar === 'baz');
}

module.exports = {
    foo : foo
}