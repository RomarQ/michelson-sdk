"use strict";(self.webpackChunkmichelson_sdk_docs=self.webpackChunkmichelson_sdk_docs||[]).push([[229],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var l=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,l,a=function(e,n){if(null==e)return{};var t,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)t=r[l],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)t=r[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=l.createContext({}),s=function(e){var n=l.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return l.createElement(c.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},u=l.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=s(t),m=a,g=u["".concat(c,".").concat(m)]||u[m]||d[m]||r;return t?l.createElement(g,i(i({ref:n},p),{},{components:t})):l.createElement(g,i({ref:n},p))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,i=new Array(r);i[0]=u;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var s=2;s<r;s++)i[s]=t[s];return l.createElement.apply(null,i)}return l.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3465:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return p},default:function(){return u}});var l=t(7462),a=t(3366),r=(t(7294),t(3905)),i=["components"],o={},c="Value Reference",s={unversionedId:"values",id:"values",title:"Value Reference",description:"Official Michelson reference",source:"@site/docs/values.md",sourceDirName:".",slug:"/values",permalink:"/michelson-sdk/values",editUrl:"https://github.com/RomarQ/michelson-sdk/tree/main/documentation/docs/values.md",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Type Reference",permalink:"/michelson-sdk/types"},next:{title:"FA2 Interface",permalink:"/michelson-sdk/FA2"}},p=[{value:"Singletons",id:"singletons",children:[{value:"Nat",id:"nat",children:[],level:3},{value:"Int",id:"int",children:[],level:3},{value:"Mutez",id:"mutez",children:[],level:3},{value:"String",id:"string",children:[],level:3},{value:"Bool",id:"bool",children:[],level:3},{value:"Bytes",id:"bytes",children:[],level:3},{value:"Address",id:"address",children:[],level:3},{value:"Contract",id:"contract",children:[],level:3},{value:"Timestamp",id:"timestamp",children:[],level:3},{value:"Chain_id",id:"chain_id",children:[],level:3},{value:"Bls12_381_fr",id:"bls12_381_fr",children:[],level:3},{value:"Bls12_381_g1",id:"bls12_381_g1",children:[],level:3},{value:"Bls12_381_g2",id:"bls12_381_g2",children:[],level:3},{value:"Key",id:"key",children:[],level:3},{value:"Key_hash",id:"key_hash",children:[],level:3},{value:"Signature",id:"signature",children:[],level:3},{value:"Unit",id:"unit",children:[],level:3},{value:"Left",id:"left",children:[],level:3},{value:"Right",id:"right",children:[],level:3},{value:"List",id:"list",children:[],level:3},{value:"Set",id:"set",children:[],level:3},{value:"Some",id:"some",children:[],level:3},{value:"None",id:"none",children:[],level:3},{value:"Pair",id:"pair",children:[],level:3},{value:"Map",id:"map",children:[],level:3},{value:"Big_map",id:"big_map",children:[],level:3},{value:"Lambda",id:"lambda",children:[],level:3},{value:"Record",id:"record",children:[],level:3},{value:"Variant",id:"variant",children:[],level:3}],level:2}],d={toc:p};function u(e){var n=e.components,t=(0,a.Z)(e,i);return(0,r.kt)("wrapper",(0,l.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"value-reference"},"Value Reference"),(0,r.kt)("p",null,"Official ",(0,r.kt)("a",{parentName:"p",href:"https://tezos.gitlab.io/michelson-reference"},"Michelson reference")),(0,r.kt)("h2",{id:"singletons"},"Singletons"),(0,r.kt)("h3",{id:"nat"},"Nat"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#nat"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Nat } from '@tezwell/michelson-sdk';\n\nconst nat_value = Nat(1);\n\n// Micheline\nconsole.log(nat_value.toMicheline());      // 1\n// JSON\nconsole.log(nat_value.toJSON());           // { int: '1' }\n")),(0,r.kt)("h3",{id:"int"},"Int"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#int"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Int } from '@tezwell/michelson-sdk';\n\nconst int_value = Int(1);\n\n// Micheline\nconsole.log(int_value.toMicheline());      // 1\n// JSON\nconsole.log(int_value.toJSON());           // { int: '1' }\n")),(0,r.kt)("h3",{id:"mutez"},"Mutez"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#mutez"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Mutez } from '@tezwell/michelson-sdk';\n\nconst mutez_value = Mutez(1);\n\n// Micheline\nconsole.log(mutez_value.toMicheline());      // 1\n// JSON\nconsole.log(mutez_value.toJSON());           // { int: '1' }\n")),(0,r.kt)("h3",{id:"string"},"String"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#string"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { String } from '@tezwell/michelson-sdk';\n\nconst string_value = String(\"A String\");\n\n// Micheline\nconsole.log(string_value.toMicheline());      // \"A String\"\n// JSON\nconsole.log(string_value.toJSON());           // { string: 'A String' }\n")),(0,r.kt)("h3",{id:"bool"},"Bool"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#bool"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Bool } from '@tezwell/michelson-sdk';\n\nconst bool_value = Bool(true);\n\n// Micheline\nconsole.log(bool_value.toMicheline());      // True\n// JSON\nconsole.log(bool_value.toJSON());           // { prim: 'True' }\n")),(0,r.kt)("h3",{id:"bytes"},"Bytes"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#bytes"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Bytes } from '@tezwell/michelson-sdk';\n\nconst bytes_value = Bytes(\"0xfffF\");\n\n// Micheline\nconsole.log(bytes_value.toMicheline());      // 0xffff\n// JSON\nconsole.log(bytes_value.toJSON());           // { bytes: 'ffff' }\n")),(0,r.kt)("h3",{id:"address"},"Address"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#address"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Address } from '@tezwell/michelson-sdk';\n\nconst address_value = Address(\"tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN\");\n\n// Micheline\nconsole.log(address_value.toMicheline());      // \"tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN\"\n// JSON\nconsole.log(address_value.toJSON());           // { string: 'tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN' }\n")),(0,r.kt)("h3",{id:"contract"},"Contract"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#contract"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Contract } from '@tezwell/michelson-sdk';\n\nconst contract_value = Contract(\"tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN\");\n\n// Micheline\nconsole.log(contract_value.toMicheline());      // \"KT1SiSomCunxkq3g7vQKYpPpWBHodhH5pJkU%entrypoint\"\n// JSON\nconsole.log(contract_value.toJSON());           // { string: 'KT1SiSomCunxkq3g7vQKYpPpWBHodhH5pJkU%entrypoint' }\n")),(0,r.kt)("h3",{id:"timestamp"},"Timestamp"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#timestamp"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Timestamp } from '@tezwell/michelson-sdk';\n\nconst timestamp_number = Timestamp(1571659294);\nconst timestamp_string = Timestamp(\"2019-09-26T10:59:51Z\");\n\n// Micheline\nconsole.log(timestamp_number.toMicheline());      // 1571659294\nconsole.log(timestamp_string.toMicheline());      // \"2019-09-26T10:59:51Z\"\n// JSON\nconsole.log(timestamp_number.toJSON());           // { int: '1571659294' }\nconsole.log(timestamp_string.toJSON());           // { string: '2019-09-26T10:59:51Z' }\n")),(0,r.kt)("h3",{id:"chain_id"},"Chain_id"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#chain_id"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Chain_id } from '@tezwell/michelson-sdk';\n\nconst chain_id_bytes = Chain_id(\"0x7a06a770\");\nconst chain_id_string = Chain_id(\"NetXynUjJNZm7wi\");\n\n// Micheline\nconsole.log(chain_id_bytes.toMicheline());      // 0x7a06a770\nconsole.log(chain_id_string.toMicheline());     // \"NetXynUjJNZm7wi\"\n// JSON\nconsole.log(chain_id_bytes.toJSON());           // { bytes: '7a06a770' }\nconsole.log(chain_id_string.toJSON());          // { string: 'NetXynUjJNZm7wi' }\n")),(0,r.kt)("h3",{id:"bls12_381_fr"},"Bls12_381_fr"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#bls12_381_fr"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Bls12_381_fr } from '@tezwell/michelson-sdk';\n\nconst bls12_381_fr_number = Bls12_381_fr(1);\nconst bls12_381_fr_bytes = Bls12_381_fr(\"0x0001\");\n\n// Micheline\nconsole.log(bls12_381_fr_number.toMicheline());    // 1\nconsole.log(bls12_381_fr_bytes.toMicheline());     // 0x0001\n// JSON\nconsole.log(bls12_381_fr_number.toJSON());         // { int: '1' }\nconsole.log(bls12_381_fr_bytes.toJSON());          // { bytes: '0001' }\n")),(0,r.kt)("h3",{id:"bls12_381_g1"},"Bls12_381_g1"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#bls12_381_g1"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Bls12_381_g1 } from '@tezwell/michelson-sdk';\n\nconst bls12_381_g1_value = Bls12_381_g1(\"0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28\");\n\n// Micheline\nconsole.log(bls12_381_g1_value.toMicheline());    // 0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28\n// JSON\nconsole.log(bls12_381_g1_value.toJSON());         // { bytes: '0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28' }\n")),(0,r.kt)("h3",{id:"bls12_381_g2"},"Bls12_381_g2"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#bls12_381_g2"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Bls12_381_g2 } from '@tezwell/michelson-sdk';\n\nconst bls12_381_g2_value = Bls12_381_g2(\"0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa\");\n\n// Micheline\nconsole.log(bls12_381_g2_value.toMicheline());    // 0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa\n// JSON\nconsole.log(bls12_381_g2_value.toJSON());         // { bytes: '13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa' }\n")),(0,r.kt)("h3",{id:"key"},"Key"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#key"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Key } from '@tezwell/michelson-sdk';\n\nconst key_value = Key(\"edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT\");\n\n// Micheline\nconsole.log(key_value.toMicheline());      // \"edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT\"\n// JSON\nconsole.log(key_value.toJSON());           // { string: 'edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT' }\n")),(0,r.kt)("h3",{id:"key_hash"},"Key_hash"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#key"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Key_hash } from '@tezwell/michelson-sdk';\n\nconst key_hash_value = Key_hash(\"tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN\");\n\n// Micheline\nconsole.log(key_hash_value.toMicheline());      // \"tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN\"\n// JSON\nconsole.log(key_hash_value.toJSON());           // { string: 'tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN' }\n")),(0,r.kt)("h3",{id:"signature"},"Signature"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#signature"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Signature } from '@tezwell/michelson-sdk';\n\nconst signature_value = Signature(\"sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe\");\n\n// Micheline\nconsole.log(signature_value.toMicheline());      // \"sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe\"\n// JSON\nconsole.log(signature_value.toJSON());           // { string: 'sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe' }\n")),(0,r.kt)("h3",{id:"unit"},"Unit"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#unit"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Unit } from '@tezwell/michelson-sdk';\n\n// Micheline\nconsole.log(Unit().toMicheline());      // Unit\n// JSON\nconsole.log(Unit().toJSON());           // { prim: 'Unit' }\n")),(0,r.kt)("h3",{id:"left"},"Left"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#or"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Left, Nat } from '@tezwell/michelson-sdk';\n\nconst or_value = Left(Nat(1);\n\n// Micheline\nconsole.log(or_value.toMicheline());      // Left 1\n// JSON\nconsole.log(or_value.toJSON());           // { prim: 'Left', args: [{ int: '1' }] }\n")),(0,r.kt)("h3",{id:"right"},"Right"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#or"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Right, Nat } from '@tezwell/michelson-sdk';\n\nconst or_value = Right(Nat(1);\n\n// Micheline\nconsole.log(or_value.toMicheline());      // Right 1\n// JSON\nconsole.log(or_value.toJSON());           // { prim: 'Right', args: [{ int: '1' }] }\n")),(0,r.kt)("h3",{id:"list"},"List"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#list"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { List, Nat } from '@tezwell/michelson-sdk';\n\nconst list_value = List([Nat(1), Nat(2)]);\n\n// Micheline\nconsole.log(list_value.toMicheline());      // { 1 ; 2 }\n// JSON\nconsole.log(list_value.toJSON());           // [ { int: '1' }, { int: '2' } ]\n")),(0,r.kt)("h3",{id:"set"},"Set"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#set"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Set, Nat } from '@tezwell/michelson-sdk';\n\nconst set_value = Set([Nat(1), Nat(2)]);\n\n// Micheline\nconsole.log(set_value.toMicheline());      // { 1 ; 2 }\n// JSON\nconsole.log(set_value.toJSON());           // [ { int: '1' }, { int: '2' } ]\n")),(0,r.kt)("h3",{id:"some"},"Some"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#option"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Some, Nat } from '@tezwell/michelson-sdk';\n\nconst some_value = Some(Nat(1));\n\n// Micheline\nconsole.log(some_value.toMicheline());      // Some 1\n// JSON\nconsole.log(some_value.toJSON());           // { prim: 'Some', args: [{ int: '1' }] }\n")),(0,r.kt)("h3",{id:"none"},"None"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#option"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { None } from '@tezwell/michelson-sdk';\n\nconst none_value = None();\n\n// Micheline\nconsole.log(none_value.toMicheline());      // None\n// JSON\nconsole.log(none_value.toJSON());           // { prim: 'None' }\n")),(0,r.kt)("h3",{id:"pair"},"Pair"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#pair"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Pair, Nat, String } from '@tezwell/michelson-sdk';\n\nconst pair_value = Pair(Nat(1), String(\"A String\"));\n\n// Micheline\nconsole.log(pair_value.toMicheline());      // (Pair 1 \"A String\")\n// JSON\nconsole.log(pair_value.toJSON());           // { prim: 'Pair', args: [{ int: '1' }, { string: 'A String' }] }\n")),(0,r.kt)("h3",{id:"map"},"Map"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#map"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Map, Nat, String } from '@tezwell/michelson-sdk';\n\nconst map_value = Map(\n    [\n        [Nat(1), String(\"A String 1\")],\n        [Nat(2), String(\"A String 2\")],\n    ]\n);\n\n// Micheline\nconsole.log(map_value.toMicheline());       // { Elt 1 \"A String 1\" ; Elt 2 \"A String 2\" }\n// JSON\nconsole.log(map_value.toJSON());            // [\n                                            //   {\n                                            //     prim: 'Elt',\n                                            //     args: [\n                                            //       {\n                                            //         int: '1',\n                                            //       },\n                                            //       {\n                                            //         string: 'A String 1',\n                                            //       }\n                                            //     ]\n                                            //   },\n                                            //   {\n                                            //     prim: 'Elt',\n                                            //     args: [\n                                            //       {\n                                            //         int: '2',\n                                            //       },\n                                            //       {\n                                            //         string: 'A String 2',\n                                            //       }\n                                            //     ]\n                                            //   }\n                                            // ]\n")),(0,r.kt)("h3",{id:"big_map"},"Big_map"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#big_map"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Big_map, Nat, String } from '@tezwell/michelson-sdk';\n\nconst big_map_value = Big_map(\n    [\n        [Nat(1), String(\"A String 1\")],\n        [Nat(2), String(\"A String 2\")],\n    ]\n);\n\n// Micheline\nconsole.log(big_map_value.toMicheline());       // { Elt 1 \"A String 1\" ; Elt 2 \"A String 2\" }\n// JSON\nconsole.log(big_map_value.toJSON());            // [\n                                                //   {\n                                                //     prim: 'Elt',\n                                                //     args: [\n                                                //       {\n                                                //         int: '1',\n                                                //       },\n                                                //       {\n                                                //         string: 'A String 1',\n                                                //       }\n                                                //     ]\n                                                //   },\n                                                //   {\n                                                //     prim: 'Elt',\n                                                //     args: [\n                                                //       {\n                                                //         int: '2',\n                                                //       },\n                                                //       {\n                                                //         string: 'A String 2',\n                                                //       }\n                                                //     ]\n                                                //   }\n                                                // ]\n")),(0,r.kt)("h3",{id:"lambda"},"Lambda"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#lambda"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Lambda } from '@tezwell/michelson-sdk';\n\nconst lambda_value = Lambda([\n    {\n        prim: 'IF',\n        args: [\n            [{ prim: 'PUSH', args: [{ prim: 'string' }, { prim: 'YES' }] }],\n            [{ prim: 'PUSH', args: [{ prim: 'string' }, { prim: 'NO' }] }],\n        ],\n    },\n]);\n\n// Micheline\nconsole.log(lambda_value.toMicheline());    // IF\n                                            //   {\n                                            //     PUSH string \"YES\";\n                                            //   }\n                                            //   {\n                                            //     PUSH string \"NO\";\n                                            //   }\n// JSON\nconsole.log(lambda_value.toJSON());         // [\n                                            //     {\n                                            //         args: [\n                                            //             [\n                                            //                 {\n                                            //                     args: [\n                                            //                         {\n                                            //                             prim: 'string',\n                                            //                         },\n                                            //                         {\n                                            //                             string: 'YES',\n                                            //                         },\n                                            //                     ],\n                                            //                     prim: 'PUSH',\n                                            //                 },\n                                            //             ],\n                                            //             [\n                                            //                 {\n                                            //                     args: [\n                                            //                         {\n                                            //                             prim: 'string',\n                                            //                         },\n                                            //                         {\n                                            //                             string: 'NO',\n                                            //                         },\n                                            //                     ],\n                                            //                     prim: 'PUSH',\n                                            //                 },\n                                            //             ],\n                                            //         ],\n                                            //         prim: 'IF',\n                                            //     },\n                                            // ]\n")),(0,r.kt)("h3",{id:"record"},"Record"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#record"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Record, Nat, String, Bytes } from '@tezwell/michelson-sdk';\n\nconst record_value = Record(\n    {\n        field1: Nat(1),\n        field2: String(\"A String\"),\n        field3: Bytes(\"0x01\"),\n    },\n    [['field1', 'field2'], 'field3'],\n);\n\n// Micheline\nconsole.log(record_value.toMicheline());    // (Pair (Pair 1 \"A String\") 0x01)\n// JSON\nconsole.log(record_value.toJSON());         // {\n                                            //     prim: 'Pair',\n                                            //     args: [\n                                            //         {\n                                            //             prim: 'Pair',\n                                            //             args: [\n                                            //                 { int: '1' },\n                                            //                 { string: 'A String' }\n                                            //             ]\n                                            //         },\n                                            //         { bytes: '01' }\n                                            //     ]\n                                            // }\n")),(0,r.kt)("h3",{id:"variant"},"Variant"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./types#variant"},"Type reference"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { Variant, Nat, TNat, TUnit } from '@tezwell/michelson-sdk';\n\nconst variant_value = Variant(\n    \"add\",\n    Nat(1),\n    TVariant({\n        add: TNat(),\n        remove: TNat(),\n        remove_all: TUnit(),\n    }),\n    ['add', ['remove', 'remove_all']],\n);\n\n// Micheline\nconsole.log(variant_value.toMicheline());   // Left 1\n// JSON\nconsole.log(variant_value.toJSON());        // {\n                                            //     prim: 'Left',\n                                            //     args: [\n                                            //         { int: '1' }\n                                            //     ]\n                                            // }\n")))}u.isMDXComponent=!0}}]);