# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: messages.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0emessages.proto\x12\x08messages\"\xc7\x01\n\x07request\x12%\n\x05steps\x18\x01 \x03(\x0b\x32\x16.messages.request.Step\x1a\x94\x01\n\x04Step\x12\x11\n\x04text\x18\x01 \x01(\tH\x00\x88\x01\x01\x12\x0c\n\x04room\x18\x02 \x01(\t\x12\x11\n\x04time\x18\x03 \x01(\tH\x01\x88\x01\x01\x12\x11\n\x04\x64\x61te\x18\x04 \x01(\tH\x02\x88\x01\x01\x12\x0c\n\x04seed\x18\x05 \x01(\t\x12\x12\n\x05image\x18\x06 \x01(\tH\x03\x88\x01\x01\x42\x07\n\x05_textB\x07\n\x05_timeB\x07\n\x05_dateB\x08\n\x06_imageb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'messages_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _REQUEST._serialized_start=29
  _REQUEST._serialized_end=228
  _REQUEST_STEP._serialized_start=80
  _REQUEST_STEP._serialized_end=228
# @@protoc_insertion_point(module_scope)