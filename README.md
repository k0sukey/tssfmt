tss-formatter became the cornerstone of tssfmt.

## tssfmt

Freedom from dependence of Alloy. 

**IMPORTANT**

tssfmt in development. There is a possibility to destroy the tss files. Please be ahead, ```--dryrun``` or ```--diff```.

### Description

tssfmt is Titanium Alloy .tss file formatter, order, beautifier for your coding standards.

#### Before

```
"Label": {
   layout: "vertical",
  color:'#ffffff',
	 width:120,
  backgroundColor: '#000000',
	left: "100dp",
			 borderColor: "#ff0000",
  borderWidth: 1,
top:10,
  height: "200",
}
```

#### After

```
'Label': {
	top: 10,
	left: 100,
	width: 120,
	height: 200,
	backgroundColor: '#000000',
	borderWidth: 1,
	borderColor: "#ff0000",
	color: '#ffffff',
	layout: 'vertical'
}
```

### Install

```sh
$ npm install tssfmt -g
```

### Usage

```sh
$ tssfmt --diff path/to/foo.tss
$ tssfmt --dryrun path/to/foo.tss
$ tssfmt path/to/foo.tss
```

### License

MIT